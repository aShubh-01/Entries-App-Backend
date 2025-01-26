import zod from 'zod';
                    

    // DATA VALIDATORs FOR USER DATA, THIS WILL MAKE SURE THAT THE USER DATA FOLLOWS A SPECIFIC SCHEMA.
export const userSchema = zod.object({                
    username: zod.string().min(1, { message: 'Username cannot be empty'}).max(255, { message: 'Username cannot exceed 255 characters' }),
    email: zod.string().min(1, { message: 'Email cannot be empty'}).includes('@', { message: `Email missing '@'`}).includes('.com', { message: `Email missing valid domain name , eg. '.com'`}).max(255, { message: 'Email cannot exceed 255 characters' }),
    password: zod.string().min(8, { message: 'Password must be atleast 8 characters'}).max(255, { message: 'Passworc cannot exceed 255 characters'}),
    phoneNumber: zod.string().min(10, { message: 'Phone number mus t be 10 digits'}).max(10, { message: 'Phone number cannot be more than 10 digits'}).optional()
});

export const userLoginCredentialsSchema  = zod.object({
    email: zod.string().min(1, { message: 'Email cannot be empty'}).includes('@', { message: `Email missing '@'`}).includes('.com', { message: `Email missing valid domain name , eg. '.com'`}).max(255, { message: 'Email cannot exceed 255 characters' }),
    password: zod.string().min(8, { message: 'Password must be atleast 8 characters'}).max(255, { message: 'Passworc cannot exceed 255 characters'}),
})