/*
Checks the strength of a password and provides feedback on its complexity,
 such as “Weak,” “Medium,” or “Strong.” The implementation can vary depending on the criteria used to determine password strength.

Here’s a simplified example that evaluates based on length and complexity:
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordStrength',
})
export class PasswordStrengthPipe implements PipeTransform {
  transform(password: string): string {
    if (!password) return '';

    if (password.length < 6) {
      return 'Weak';
    } else if (password.length < 10) {
      return 'Medium';
    } else {
      // You can add more criteria for a "Strong" password
      return 'Strong';
    }
  }
}

// <p>{{ 'Pass123' | passwordStrength }}</p>
// <!-- Output: "Medium" -->

// <p>{{ 'StrongPassword123' | passwordStrength }}</p>
// <!-- Output: "Strong" -->
