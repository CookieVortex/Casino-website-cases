// client/src/models/UserDTO.js

class UserDTO {
    constructor(name, email, role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }

    static fromServerResponse(responseData) {
        const { name, email, role } = responseData;
        return new UserDTO(name, email, role);
    }
}

export default UserDTO;
