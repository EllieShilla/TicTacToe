namespace SpaceGame.UserService.API.Infrastructure
{
    public class GlobalExceptionHandler : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            context.Result = new ObjectResult(context.Exception.Message)
            {
                StatusCode = (int)StatusCodes.Status500InternalServerError,
            };

            if (context.Exception is AmazonCognitoIdentityProviderException cognitoException)
            {
                context.Result = new ObjectResult(cognitoException.Message)
                {
                    StatusCode = (int)cognitoException.StatusCode
                };
            }
            else if (context.Exception is ApiException apiException)
            {
                switch (apiException.ExceptionType)
                {
                    case ExceptionType.OperationException:
                    case ExceptionType.InvalidToken:
                        context.Result = new BadRequestObjectResult(context.Exception.Message);
                        break;
                    default:
                        context.Result = new ObjectResult(context.Exception.Message)
                        {
                            StatusCode = (int)StatusCodes.Status500InternalServerError,
                        };
                        break;
                }
            }

            base.OnException(context);
        }
    }
}