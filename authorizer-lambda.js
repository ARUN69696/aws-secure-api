export const handler = async (event) => {
    // API Gateway routes the authorization token string here
    const token = event.authorizationToken; 
    const methodArn = event.methodArn; 

    // Verification handshake logic
    if (token === "Bearer secret-token-123") {
        return generatePolicy("user123", "Allow", methodArn);
    } else {
        return generatePolicy("unauthorized-user", "Deny", methodArn);
    }
};

// Helper function to build the IAM Policy required by API Gateway proxy routing
function generatePolicy(principalId, effect, resource) {
    const authResponse = { principalId };
    
    if (effect && resource) {
        authResponse.policyDocument = {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: resource
                }
            ]
        };
    }
    
    // Inject metadata context to pass downstream to the business logic layer
    authResponse.context = {
        userId: principalId,
        tier: "Premium"
    };
    
    return authResponse;
}
