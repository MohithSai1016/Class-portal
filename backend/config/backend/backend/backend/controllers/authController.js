async function register(req,res){

    try{

        const result=
        await authService.register(req.body);

        res.status(201).json(result);

    }catch(err){

        res.status(400).json({

            success:false,

            message:err.message

        });

    }

}