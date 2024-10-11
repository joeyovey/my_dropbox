import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteFolder } from "../../firebaseConfig"; // Import deleteFolder function
import swal from "sweetalert"; // Import SweetAlert

export default function Folder({ folder }) {
  // Handler for deleting a folder
  const handleDelete = (e) => {
    e.preventDefault();

    // SweetAlert confirmation before deleting
    swal({
      title: `Are you sure you want to delete the folder "${folder.name}"?`,
      text: "Once deleted, you will not be able to recover this folder!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Delete the folder using the deleteFolder function
        deleteFolder(folder.id)
          .then(() => {
            // SweetAlert success message
            swal("Folder deleted successfully!", {
              icon: "success",
            });
          })
          .catch((error) => {
            // SweetAlert error message
            swal("Failed to delete folder!", {
              icon: "error",
            });
            console.error("Error deleting folder: ", error);
          });
      } else {
        // SweetAlert cancellation message (optional)
        swal("Your folder is safe!");
      }
    });
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
