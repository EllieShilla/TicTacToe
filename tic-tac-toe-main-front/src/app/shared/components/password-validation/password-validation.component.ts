import { Component, Input } from '@angular/core';
import { PASSWORD_VALIDATION_RULES } from '../../../core/models/authorization.models';

@Component({
  selector: 'app-password-validation',
  templateUrl: './password-validation.component.html',
  styleUrls: ['./password-validation.component.scss']
})
export class PasswordValidationComponent {
  @Input() isPasswordTouched: boolean = false;
  @Input() isPasswordRulesValid!: PASSWORD_VALIDATION_RULES;
}
