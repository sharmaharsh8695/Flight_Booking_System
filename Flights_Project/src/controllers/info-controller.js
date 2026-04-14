const info = (req,res) => {
    res.json({
        success : true,
        mssg : "Api is live" 
    })
}

module.exports={ info };
