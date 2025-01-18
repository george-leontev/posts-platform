export default {
    host: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : `http://${window.location.hostname}:3000`,
    accountSignIn: '/auth/sign-in',
    accountSignOut: '/auth/sign-out',
    posts: '/api/posts',
    uploadedFiles: 'api/uploaded-files'
};