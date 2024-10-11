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
      title: `Are you sure you want to delete this file?`,
      text: "Once deleted, you will not be able to recover it!",
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
                swal("File deleted successfully!", { icon: "success" });
              })
              .catch((error) => {
                swal("Failed to delete file!", { icon: "error" });
                console.error("Error deleting file from Firestore: ", error);
              });
          })
          .catch((error) => {
            swal("Failed to delete file from storage!", { icon: "error" });
            console.error("Error deleting file from Storage: ", error);
          });
      } else {
        swal("Your file is safe!");
      }
    });
  }

  // Check file type for rendering preview
  const isImage = file.name.match(/\.(jpeg|jpg|gif|png|bmp)$/i);
  const isPDF = file.name.match(/\.pdf$/i);
  const isVideo = file.name.match(/\.(mp4|webm|ogg)$/i);
  const isAudio = file.name.match(/\.(mp3|wav)$/i);

  return (
    <div className="file-item d-flex flex-column align-items-center">
      <div className="file-preview">
        {/* Render an image preview */}
        {isImage && (
          <img
            src={file.url}
            alt="File Preview"
            style={{ maxWidth: "150px", maxHeight: "150px" }}
            className="mb-2"
          />
        )}

        {/* Render a PDF preview using an <iframe> */}
        {isPDF && (
          <iframe
            src={file.url}
            title="File Preview"
            style={{ maxWidth: "150px", maxHeight: "150px" }}
            className="mb-2"
          />
        )}

        {/* Render a video preview */}
        {isVideo && (
          <video
            controls
            src={file.url}
            style={{ maxWidth: "220px", maxHeight: "220px" }}
            className="mb-2"
          />
        )}

        {/* Render an audio preview */}
        {isAudio && <audio controls src={file.url} className="mb-2" />}

        {/* For non-previewable files, display a download link */}
        {!isImage && !isPDF && !isVideo && !isAudio && (
          <a
            href={file.url}
            className="btn btn-outline-primary text-truncate w-75"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        )}
      </div>

      {/* Delete Button below the file preview */}
      <button
        className="btn btn-outline-danger mt-2"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
