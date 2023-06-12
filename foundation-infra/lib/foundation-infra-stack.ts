import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from 'dotenv';

dotenv.config();

export class FoundationInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, 'FoundationBaseLayer', {
      code: lambda.Code.fromAsset('lambda_base_layer/layer.zip'),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_10],
    })

    const apiLambdaRole = new iam.Role(this, 'FoundationApiLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    apiLambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"));

    const apiLambda = new lambda.Function(this, 'FoundationApiFunction', {
      role: apiLambdaRole,
      runtime: lambda.Runtime.PYTHON_3_10,
      code: lambda.Code.fromAsset('../app/'),
      handler: 'foundation_api.handler',
      layers: [layer],
      environment: {
        'OPENAI_API_KEY': process.env.OPENAI_API_KEY ?? '',
      },
    })

    const restApi = new apiGateway.RestApi(this, 'FoundationRestApi', {
      restApiName: 'Foundation API',
    })

    restApi.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(apiLambda)
    })

  }
}
