const Services = require("../../models/administration/Services");

exports.insertToServices = async (req, res) => {
  const {
    ServiceName,
    WeekdayEarly,
    WeekdayLate,
    WeekdayNight,
    WeekendEarly,
    WeekendLate,
    WeekendNight,
    Tax,
  } = req.body;

  if (
    !ServiceName ||
    !WeekdayEarly ||
    !WeekdayLate ||
    !WeekdayNight ||
    !WeekendEarly ||
    !WeekendLate ||
    !WeekendNight ||
    !Tax
  ) {
    return res.status(400).json({ error: "All The Fields are Required" });
  }

  try {
    const newServices = new Services(req.body);
    const savedServices = await newServices.save();
    console.log(savedServices);
    res.status(201).json({
      message: "Services saved successfully",
      result: savedServices,
    });
  } catch (e) {
    res
      .status(500)
      .json({ error: e.message, message: "Internal Server Error" });
  }
};

exports.viewAllServices = async (req, res) => {
  try {
    const services = await Services.find({});

    if (services.length === 0) {
      return res.status(200).json({ message: "No Services Available." });
    }

    res.status(200).json({
      services: services,
      message: `${services.length} no of services available`,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};

exports.viewServiceDetails = async (req, res) => {
  try {
    const _id = req.params.serviceId;
    const findService = await Services.findOne({ _id });

    if (!findService) {
      return res.status(404).json({ error: "Service Not Found" });
    }

    res.status(200).json({ service: findService });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};

exports.updateServices = async (req, res) => {
  const serviceId = req.params.serviceId;
  const {
    ServiceName,
    WeekdayEarly,
    WeekdayLate,
    WeekdayNight,
    WeekendEarly,
    WeekendLate,
    WeekendNight,
    Tax,
  } = req.body;
  try {
    const existingService = await Services.findOne({ _id: serviceId });

    if (!existingService) {
      return res.status(404).json({ error: "Service not found" });
    }

    let query = {
      $set: {
        ServiceName,
        WeekdayEarly,
        WeekdayLate,
        WeekdayNight,
        WeekendEarly,
        WeekendLate,
        WeekendNight,
        Tax,
      },
    };

    const updatedServices = await Services.updateOne({ _id: serviceId }, query);
    res.status(200).json({ message: "Service has been updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteaService = async (req, res) => {
  try {
    const _id = req.params.serviceId;
    const findService = await Services.findOne({ _id });

    if (!findService) {
      return res.status(404).json({ message: "Service Not Found" });
    }
    const removedService = await findService.remove();
    res.status(200).json({
      result: removedService,
      message: "Service Removed Successfully",
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};
