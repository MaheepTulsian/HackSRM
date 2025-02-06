import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import ToggleTheme from "../components/ToggleTheme";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { Button } from "../components/ui/button";


function TeacherDashboard() {
    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);
    const [newClassName, setNewClassName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Fetch classes from API
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch("http://localhost:8000/teacher/get_class/67a3f389e259d644dc7766f0");
                if (!response.ok) {
                    throw new Error("Failed to fetch classes");
                }
                const data = await response.json();
                setClasses(data.class_room); // Change from `data.classes` to `data.class_room`
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };

        fetchClasses();
    }, []);


    // Add new class to the backend
    const handleAddClass = async () => {
        if (!newClassName.trim()) return;

        try {
            const response = await fetch("http://localhost:8000/teacher/create-classroom/67a3f389e259d644dc7766f0", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ class_name: newClassName }), // Send only class_name
            });

            if (!response.ok) {
                throw new Error("Failed to create class");
            }

            setNewClassName("");
            setIsModalOpen(false);

            // Reload page to fetch updated classes
            window.location.reload();
        } catch (error) {
            console.error("Error creating class:", error);
        }
    };



    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <header className="flex items-center justify-between bg-background h-16 px-4 border-b sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold">Teacher Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Avatar className="cursor-pointer h-8 w-8">
                        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLw2k_YFfnOD_uLazPqg3fyKDAtMI-ZqJ1aQ&s" alt="John Doe" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <ToggleTheme />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Displaying Classes Dynamically */}
                    {classes?.map((classItem) => (
                        <Link to={`/teacherdashboard/class/${classItem._id}`} key={classItem._id}>
                            <Card className="p-4 shadow-md">
                                <CardHeader>
                                    <CardTitle>{classItem.class_name}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Add Class Button */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                    <button
                        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg z-20"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Add Class
                    </button>
                </DialogTrigger>

                <DialogContent className="w-full max-w-md">
                    <DialogTitle>Add New Class</DialogTitle>
                    <DialogDescription>Enter the name of the class you want to create.</DialogDescription>
                    <input
                        type="text"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg mt-2 
               text-gray-900 bg-white 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               transition duration-200 ease-in-out hover:border-gray-400"
                        placeholder="Class Name"
                    />
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAddClass}>
                            Add Class
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Separator />
        </div>
    );
}

export default TeacherDashboard;
