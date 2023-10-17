/**
*  @swagger
*  components:
*    schemas:
*      User:
*        type: object
*        properties:
*          userId:
*            type: string
*            description: The unique identifier of the user.
*            example: 60d0fe4f532529001f4ee5a6
*          userName:
*            type: string
*            description: The username of the user.
*            example: johndoe
*          firstName:
*            type: string
*            description: The first name of the user.
*            example: John
*          lastName:
*            type: string
*            description: The last name of the user.
*            example: Doe
*          email:
*            type: string
*            description: The email address of the user.
*            example: johndoe@example.com
*          image:
*            type: string
*            description: The image URL of the user.
*            example: https://example.com/images/johndoe.jpg
*          my_recipes:
*            type: array
*            items:
*              type: string
*            description: The list of recipes created by the user.
*          saved_recipes:
*            type: array
*            items:
*              type: string
*            description: The list of recipes saved by the user.
*/

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User management
 */

  const userToDTO = (user) => {
    return {
        userId: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        my_recipes: user.my_recipes,
        saved_recipes: user.saved_recipes,
    }
}

module.exports = userToDTO