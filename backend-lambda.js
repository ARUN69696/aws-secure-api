export const handler = async (event) => {
    // Unpack context headers passed from the Lambda Authorizer perimeter gate
    const userId = event.requestContext?.authorizer?.userId || "Unknown User";
    const tier = event.requestContext?.authorizer?.tier || "Standard";

    return {
        statusCode: 200,
        headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" // Enforces global CORS compliance for frontends
        },
        body: JSON.stringify({
            message: "Hello from the secured backend API!",
            authContext: `Authenticated as ${userId} on the ${tier} tier.`,
            timestamp: new Date().toISOString()
        })
    };
};
