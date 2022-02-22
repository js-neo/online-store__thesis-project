class TokenService {
    //return accessToken, refreshToken, expiresIn
    generate() {
        return {
            accessToken: "",
            refreshToken: "",
            expiresIn: "",
            userId: ""
        };
    }
}

module.exports = new TokenService();
