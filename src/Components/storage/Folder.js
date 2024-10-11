import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteFolder } from "../../firebaseConfig"; // Import deleteFolder function

export default function Folder({ folder }) {
  // Handler for deleting a folder
  const handleDelete = (e) => {
    e.preventDefault();

    // Ask for confirmation before deleting
    if (window.confirm(`Are you sure you want to delete the folder "${folder.name}"?`)) {
      // Delete the folder using the deleteFolder function
      deleteFolder(folder.id)
        .then(() => {
          console.log("Folder deleted successfully");
          alert("Folder deleted successfully"); // Optional: alert success
        })
        .catch((error) => {
          console.error("Error deleting folder: ", error);
          alert("Failed to delete folder"); // Optional: alert failure
        });
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <Button
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder: folder },
        }}
        variant="outline-primary"
        className="text-truncate w-100 mr-2"
        as={Link}
      >
        <FontAwesomeIcon icon={faFolder} className="mr-2" />
        {folder.name}
      </Button>
      <Button variant="outline-danger" onClick={handleDelete} className="ml-2">
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
  );
}
