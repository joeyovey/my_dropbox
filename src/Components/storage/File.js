import { faFile, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { storage, db } from "../../firebaseConfig"
import { useAuthenticate } from "../../Context"

export default function File({ file, currentFolder }) {
  const { currentUser } = useAuthenticate()

  // Delete function to handle file deletion
  function handleDelete() {
    const filePath =
      currentFolder === null || currentFolder === undefined
        ? `${file.name}`
        : `${currentFolder.path.join("/")}/${file.name}`

    // Delete from Firebase Storage
    const fileRef = storage.ref(`/files/${currentUser.uid}/${filePath}`)
    fileRef
      .delete()
      .then(() => {
        // Delete from Firestore
        db.files
          .where("name", "==", file.name)
          .where("userId", "==", currentUser.uid)
          .where("folderId", "==", currentFolder?.id || null)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete()
            })
          })
      })
      .catch(error => {
        console.error("Error deleting file: ", error)
      })
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
      <button
        className="btn btn-outline-danger ml-2"
        onClick={handleDelete}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}
