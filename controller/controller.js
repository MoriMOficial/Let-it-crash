import { User } from '../model/userModel.js'

    // get the request body, create it in the database and send response to "AsyncLocalStorage"
export const controller = {
    register: async(request, response) => {
        const { name, email } = request.body

        const userBody = {
            name,
            email
        }

        const result = await User.create(userBody)
        return response.end(JSON.stringify(result))
    }
}