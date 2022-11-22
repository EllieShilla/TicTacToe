namespace SpaceGame.UserService.API.Infrastructure
{
    public enum ExceptionType
    {
        OperationException = 0,
        InvalidToken = 1
    }

    public class ApiException: Exception
    {
        public ApiException(string message, ExceptionType exceptionType) : base(message)
        {
            ExceptionType = exceptionType;
        }

        public ExceptionType ExceptionType { get; protected set; }
    }
}