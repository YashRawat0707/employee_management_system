import Department from "../models/departmentmodel.js";

// Fetch all departments
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" });
    }
};

// Add a new department
const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;

        if (!dep_name) {
            return res.status(400).json({ success: false, error: "Department name is required" });
        }

        const newDep = new Department({ dep_name, description });
        await newDep.save();

        return res.status(201).json({ success: true, department: newDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while adding department" });
    }
};

// Fetch a department by ID
const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({ success: true, department });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error fetching department" });
    }
};

// Update a department
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body;

        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { dep_name, description },
            { new: true }
        );

        if (!updatedDepartment) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({ success: true, department: updatedDepartment });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error updating department" });
    }
};

const deleteDepartment = async(req,res) => {
    try {
        const { id } = req.params;
        

        const deleteDepartment = await Department.findByIdAndDelete(
            {_id: id}
        );
        return res.status(200).json({ success: true, department: deleteDepartment });
    } catch (error) {
        return res.status(500).json({ success: false, error: "delete department server error" });
    }
}

export {
    addDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};
