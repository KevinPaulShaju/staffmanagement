const Services = require("../../models/administration/Services");


exports.insertToServices = async(req, res) =>{
    const {
        ServiceName,
        WeekdayEarly,
        WeekdayLate,
        WeekdayNight,
        WeekendEarly,
        WeekendLate,
        WeekendNight,
        Tax
    } = req.body;

    if(
       !ServiceName || 
       !WeekdayEarly ||
       !WeekdayLate ||
       !WeekdayNight ||
       !WeekendEarly ||
       !WeekendLate ||
       !WeekendNight ||
       !Tax
    ){
        return res.status(400).json({error: "All The Fields are Required"});
    }

    try {
        const newServices = new Services(req.body);
        const savedServices = newServices.save();
        res.status(201).json({
            message:"Services saved successfully",
            result:savedServices
        });
    } catch (e) {
        res.status(500).json({error: e.message,message:"Internal Server Error"});
    }
}

exports.viewAllServices = async (req, res) => {
    try {
        
        const services = await Services.find({});

        if (services.length === 0) {
            return res.status(200).json({message: "No Services Available."});
        }

        res.status(200).json({
            message: services,
            count:`${services.length} no of services available`
        });
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message:"Internal Server Error"
        })
    }
}

exports.viewServiceDetails = async (req, res) => {
    try {
        const _id = req.params.serviceId;
        const findService = await Services.findOne({_id});

        if(!findService) {
            return res.status(404).json({ error: "Service Not Found" });
        }

        res.status(200).json({message: findService});
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message:"Internal Server Error"
        })
    }
}

exports.deleteaService = async (req, res) => {
    try {
        const _id = req.params.serviceId;
        const findService = await Services.findOne({_id});

        if(!findService) {
            return res.status(404).json({message: "Service Not Found"});
        }
        const removedService = await findService.remove();
        res.status(200).json({
            result: removedService,
            message: "Service Removed Successfully"
        });
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message:"Internal Server Error"
        })
    }
}