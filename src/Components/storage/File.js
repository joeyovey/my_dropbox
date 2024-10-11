import { faFile, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { storage, db } from "../../firebaseConfig";
import { useAuthenticate } from "../../Context";
import swal from "sweetalert"; // Import SweetAlert

export default function File({ file, currentFolder }) {
  const { currentUser } = useAuthenticate();

  // Delete function to handle file deletion
  function handleDelete() {
    const filePath =
      currentFolder === null || currentFolder === undefined
        ? `${file.name}`
        : `${currentFolder.path.join("/")}/${file.name}`;

    // SweetAlert confirmation before deleting the file
    swal({
      title: `Are you sure you want to delete the file "${file.name}"?`,
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Delete from Firebase Storage
        const fileRef = storage.ref(`/files/${currentUser.uid}/${filePath}`);
        fileRef
          .delete()
          .then(() => {
            // Delete from Firestore
            db.files
              .where("name", "==", file.name)
              .where("userId", "==", currentUser.uid)
              .where("folderId", "==", currentFolder?.id || null)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  doc.ref.delete();
                });
              })
              .then(() => {
                // SweetAlert success message
                swal("File deleted successfully!", {
                  icon: "success",
                });
              })
              .catch((error) => {
                // SweetAlert error message
                swal("Failed to delete file!", {
                  icon: "error",
                });
                console.error("Error deleting file from Firestore: ", error);
              });
          })
          .catch((error) => {
            // SweetAlert error message
            swal("Failed to delete file from storage!", {
              icon: "error",
            });
            console.error("Error deleting file from Storage: ", error);
          });
      } else {
        // SweetAlert cancellation message (optional)
        swal("Your file is safe!");
      }
    });
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <a
        href={file.url}
        className="btn btn-outline-primary text-truncate w-75"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faFile} className="mr-2" />
        {file.name}
      </a>

      {/* Delete Button */}
      <button className="btn btn-outline-danger ml-2" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}
