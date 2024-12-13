import "dotenv/config";
export const database_urls = Object.freeze({
  connection: process.env.DB_URL || "mongodb://127.0.0.1:27017/",
  db_name: process.env.DB_NAME || "heyreach",
});

export const statusCodes = Object.freeze({
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  movedPermanently: 301,
  found: 302,
  notModified: 304,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  conflict: 409,
  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
})

export const Message = {
  notFound: "Not Found",
  registerSuccessfully: "Successfully Registered",
  inValid: "Invalid Credentials",
  successfullyUpdate: "Updated Successfully",
  alreadyExist: "Already Exist",
  userNotGet: "Fetching Error User",
  slot_unavailable: "Slot Not Available",
  notCreated: "Not Created",
  notUpdated: " Not Updated",
  notDeleted: " Not Deleted",
  notRegistered: "User Not Registered",
  wrongPassword: "Wrong Password",
  loginSuccessfully: "Login Successfully",
  loginError: "Login Error",
  notUpdate: "Update Failed",
  serverError: "Intrnal Server Error",
};

export const errorCodes = Object.freeze({
  already_exist: "ALREADY_EXIST",
  invalid_input: "INVALID_INPUT",
  not_found: "NOT_FOUND",
  unauthorized: "UNAUTHORIZED",
  forbidden: "FORBIDDEN",
  server_error: "SERVER_ERROR",
  service_unavailable: "SERVICE_UNAVAILABLE",
  timeout: "TIMEOUT",
  conflict: "CONFLICT",
  bad_request: "BAD_REQUEST",
  precondition_failed: "PRECONDITION_FAILED",
  payment_required: "PAYMENT_REQUIRED",
  method_not_allowed: "METHOD_NOT_ALLOWED",
  not_acceptable: "NOT_ACCEPTABLE",
  request_too_large: "REQUEST_TOO_LARGE",
  internal_error: "INTERNAL_ERROR",
  unsupported_media_type: "UNSUPPORTED_MEDIA_TYPE",
  too_many_requests: "TOO_MANY_REQUESTS",
  gone: "GONE",
  unauthorized_access: "UNAUTHORIZED_ACCESS",
  account_locked: "ACCOUNT_LOCKED",
  account_disabled: "ACCOUNT_DISABLED",
  insufficient_permissions: "INSUFFICIENT_PERMISSIONS",
  operation_failed: "OPERATION_FAILED",
  invalid_token: "INVALID_TOKEN",
  expired_token: "EXPIRED_TOKEN",
  access_denied: "ACCESS_DENIED",
  user_exists: "USER_EXISTS",
  email_already_registered: "EMAIL_ALREADY_REGISTERED",
  password_mismatch: "PASSWORD_MISMATCH",
  resource_unavailable: "RESOURCE_UNAVAILABLE",
  quota_exceeded: "QUOTA_EXCEEDED",
  action_not_allowed: "ACTION_NOT_ALLOWED",
  database_error: "DATABASE_ERROR",
  invalid_session: "INVALID_SESSION",
  invalid_request: "INVALID_REQUEST",
  invalid_credentials: "INVALID_CREDENTIALS",
  operation_timeout: "OPERATION_TIMEOUT",
  rate_limit_exceeded: "RATE_LIMIT_EXCEEDED",
  not_implemented: "NOT_IMPLEMENTED",
  unsupported_operation: "UNSUPPORTED_OPERATION",
  invalid_format: "INVALID_FORMAT",
  service_busy: "SERVICE_BUSY",
  network_error: "NETWORK_ERROR",
  system_error: "SYSTEM_ERROR",
  user_not_found: "USER_NOT_FOUND",
  resource_locked: "RESOURCE_LOCKED",
  insufficient_balance: "INSUFFICIENT_BALANCE",
  transaction_failed: "TRANSACTION_FAILED",
  invalid_parameters: "INVALID_PARAMETERS",
  action_failed: "ACTION_FAILED",
  operation_not_supported: "OPERATION_NOT_SUPPORTED",
  missing_parameters: "MISSING_PARAMETERS",
  file_not_found: "FILE_NOT_FOUND",
  file_too_large: "FILE_TOO_LARGE",
  malformed_request: "MALFORMED_REQUEST",
  authentication_required: "AUTHENTICATION_REQUIRED",
  access_forbidden: "ACCESS_FORBIDDEN",
  not_permitted: "NOT_PERMITTED",
  invalid_email: "INVALID_EMAIL",
  password_too_weak: "PASSWORD_TOO_WEAK",
  email_not_verified: "EMAIL_NOT_VERIFIED",
  action_not_found: "ACTION_NOT_FOUND",
  resource_not_found: "RESOURCE_NOT_FOUND",
  failed_dependency: "FAILED_DEPENDENCY",
  locked_account: "LOCKED_ACCOUNT",
  user_not_active: "USER_NOT_ACTIVE",
  already_subscribed: "ALREADY_SUBSCRIBED",
  subscription_expired: "SUBSCRIPTION_EXPIRED",
  request_failed: "REQUEST_FAILED",
  invalid_api_key: "INVALID_API_KEY",
  api_limit_exceeded: "API_LIMIT_EXCEEDED",
  invalid_authentication: "INVALID_AUTHENTICATION",
  method_not_accepted: "METHOD_NOT_ACCEPTED",
  entity_not_found: "ENTITY_NOT_FOUND",
  feature_disabled: "FEATURE_DISABLED",
  missing_auth_token: "MISSING_AUTH_TOKEN",
  invalid_operation: "INVALID_OPERATION",
});
