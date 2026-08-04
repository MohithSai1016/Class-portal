async function register(data) {

    const existing =
        await User.findByUsername(data.username);

    if (existing) {

        throw new Error("Username already exists.");

    }

    const hash =
        await bcrypt.hash(data.password,10);

    const id =
        await User.create({

            username:data.username,

            password:hash,

            full_name:data.full_name,

            email:data.email,

            role:data.role,

            department_id:data.department_id

        });

    return{

        success:true,

        userId:id

    };

}