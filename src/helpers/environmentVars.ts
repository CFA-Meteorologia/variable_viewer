// these variables are added the way it is mentioned here https://create-react-app.dev/docs/adding-custom-environment-variables/

const variables = {
  api_url: process.env.REACT_APP_API_URL || 'http://localhost:7000',
}

export default variables
