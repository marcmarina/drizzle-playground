export class ConfigurationError extends Error {
  constructor(message: string) {
    super(`Failed to gather configuration. ${message}`);
  }
}

export class MissingEnvironmentVariableError extends ConfigurationError {
  variableName: string;

  constructor(variableName: string) {
    super(`Missing environment variable.`);
    this.variableName = variableName;
  }
}

export class InvalidEnumError extends ConfigurationError {
  variableName: string;
  allowedValues: string[];
  value: string;

  constructor(variableName: string, allowedValues: string[], value: string) {
    super(`Environment variable is not one of the allowed values.`);
    this.variableName = variableName;
    this.allowedValues = allowedValues;
    this.value = value;
  }
}

export class InvalidIntegerError extends ConfigurationError {
  variableName: string;
  value: string;

  constructor(variableName: string, value: string) {
    super(`Environment variable is not a valid integer.`);
    this.variableName = variableName;
    this.value = value;
  }
}
