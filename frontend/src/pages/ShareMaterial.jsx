import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

function ClassroomDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [newPdfLink, setNewPdfLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Fetch assignments or announcements from the API
    const fetchAssignments = async () => {
      try {
        const response = await fetch("http://localhost:8000/teacher/get-pdf/67a3f389e259d644dc7766f0/67a3f4bb985fed836299c55a");
        const data = await response.json();

        // Check if pdf_urls is present and set it to assignments
        if (data.pdf_urls && data.pdf_urls.length > 0) {
          setAssignments(data.pdf_urls.map((url, index) => ({
            id: index + 1,
            title: `Material ${index + 1}`,
            url: url
          })));
        } else {
          console.error("No PDF URLs found");
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  const handleAddMaterial = async () => {
    if (!newPdfLink) {
      alert("Please provide a valid PDF link.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/teacher/post-pdf/67a3f389e259d644dc7766f0/67a3f4bb985fed836299c55a", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdf_url: newPdfLink }),
      });

      if (response.ok) {
        alert("Material added successfully!");
        setNewPdfLink(""); // Reset the input field
        setIsModalOpen(false); // Close the modal after submission
        window.location.reload(); // Reload the page to fetch updated assignments
      } else {
        alert("Failed to add material. Please try again.");
      }
    } catch (error) {
      console.error("Error adding material:", error);
      alert("Error adding material. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      {/* Upcoming Section */}
      <section className="p-6">
        <div className="space-y-4">
          {assignments.length === 0 ? (
            <div className="text-mutedText">Woohoo, no work due soon!</div>
          ) : (
            assignments.map((item) => (
              <Card key={item.id} className="shadow-lg rounded-lg p-4">
                <CardContent>
                  <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="text-lg font-semibold">{item.title}</div>
                    </div>
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Download PDF</a>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Fixed Button to Open Modal */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        Add Material
      </Button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
            <div className="text-2xl font-semibold text-gray-800 mb-6">Add New Material</div>
            <input
              type="url"
              placeholder="Enter PDF Link"
              value={newPdfLink}
              onChange={(e) => setNewPdfLink(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg my-2 mb-2 
               text-gray-900 bg-white 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               transition duration-200 ease-in-out hover:border-gray-400"
            />
            <Button
              onClick={handleAddMaterial}
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
            >
              {isSubmitting ? "Adding..." : "Add Material"}
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-4 bg-gray-600 text-white p-3 rounded-md shadow-md hover:bg-gray-700 transition duration-200"
            >
              Close
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ClassroomDashboard;
