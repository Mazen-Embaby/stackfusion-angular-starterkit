import { Injectable, inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

/**
 * Service for handling errors across the component library.
 *
 * This service provides centralized error handling and logging
 * following Angular Material's error handling patterns.
 */
@Injectable({
  providedIn: 'root',
})
export class SfErrorHandlerService {
  private readonly platform = inject(Platform);

  /**
   * Handles errors that occur in components.
   *
   * @param error The error that occurred
   * @param context Additional context about where the error occurred
   */
  handleError(error: Error, context?: string): void {
    if (!this.platform.isBrowser) {
      return;
    }

    const errorMessage = this.formatErrorMessage(error, context);

    // Log the error
    console.error(errorMessage, error);

    // In development, we might want to show more detailed errors
    if (this.isDevelopmentMode()) {
      this.showDevelopmentError(errorMessage, error);
    }
  }

  /**
   * Handles warnings that should be logged but don't break functionality.
   *
   * @param message The warning message
   * @param context Additional context about the warning
   */
  handleWarning(message: string, context?: string): void {
    if (!this.platform.isBrowser) {
      return;
    }

    const warningMessage = this.formatWarningMessage(message, context);
    console.warn(warningMessage);
  }

  /**
   * Validates component inputs and throws descriptive errors for invalid values.
   *
   * @param value The value to validate
   * @param propertyName The name of the property being validated
   * @param expectedType The expected type of the value
   */
  validateInput<T>(value: T, propertyName: string, expectedType: string, componentName: string): void {
    if (value === null || value === undefined) {
      return; // Allow null/undefined unless explicitly required
    }

    const actualType = typeof value;
    if (actualType !== expectedType) {
      const error = new Error(
        `Invalid input for ${componentName}.${propertyName}: expected ${expectedType}, got ${actualType}`,
      );
      this.handleError(error, `${componentName}.${propertyName}`);
    }
  }

  /**
   * Validates that a required input is provided.
   *
   * @param value The value to check
   * @param propertyName The name of the required property
   * @param componentName The name of the component
   */
  validateRequiredInput<T>(value: T, propertyName: string, componentName: string): void {
    if (value === null || value === undefined) {
      const error = new Error(`Required input missing for ${componentName}.${propertyName}`);
      this.handleError(error, `${componentName}.${propertyName}`);
    }
  }

  /**
   * Validates that a value is within a specified range.
   *
   * @param value The numeric value to validate
   * @param min The minimum allowed value
   * @param max The maximum allowed value
   * @param propertyName The name of the property
   * @param componentName The name of the component
   */
  validateRange(value: number, min: number, max: number, propertyName: string, componentName: string): void {
    if (value < min || value > max) {
      const error = new Error(
        `Invalid range for ${componentName}.${propertyName}: expected between ${min} and ${max}, got ${value}`,
      );
      this.handleError(error, `${componentName}.${propertyName}`);
    }
  }

  /**
   * Validates that a value is one of the allowed options.
   *
   * @param value The value to validate
   * @param allowedValues Array of allowed values
   * @param propertyName The name of the property
   * @param componentName The name of the component
   */
  validateEnum<T>(value: T, allowedValues: readonly T[], propertyName: string, componentName: string): void {
    if (!allowedValues.includes(value)) {
      const error = new Error(
        `Invalid value for ${componentName}.${propertyName}: expected one of [${allowedValues.join(', ')}], got ${value}`,
      );
      this.handleError(error, `${componentName}.${propertyName}`);
    }
  }

  /**
   * Formats an error message with context.
   */
  private formatErrorMessage(error: Error, context?: string): string {
    const prefix = '[StackFusion]';
    const contextPart = context ? ` (${context})` : '';
    return `${prefix} Error${contextPart}: ${error.message}`;
  }

  /**
   * Formats a warning message with context.
   */
  private formatWarningMessage(message: string, context?: string): string {
    const prefix = '[StackFusion]';
    const contextPart = context ? ` (${context})` : '';
    return `${prefix} Warning${contextPart}: ${message}`;
  }

  /**
   * Checks if the application is running in development mode.
   */
  private isDevelopmentMode(): boolean {
    return this.platform.isBrowser && (window as any).ng?.devMode === true;
  }

  /**
   * Shows development-specific error information.
   */
  private showDevelopmentError(message: string, error: Error): void {
    // In development, we could show a more detailed error overlay
    // or log additional debugging information
    console.group('StackFusion Development Error');
    console.error('Message:', message);
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    console.groupEnd();
  }
}
