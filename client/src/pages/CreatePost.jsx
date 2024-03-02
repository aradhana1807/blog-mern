import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgess] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({})
    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError("Please select an image");
                return;
            }
            setImageUploadError(null);

            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgess(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgess(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgess(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL })
                    })
                }
            )
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgess(null);
            console.log(error);
        }
    }
    return (
        <div className="font-display p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput id="title" type="text" placeholder="Title" required
                        className="flex-1"
                    />
                    <Select>
                        <option value="uncategorized">Select a category
                        </option>
                        <option value="daily struggle">Daily Struggle
                        </option>
                        <option value="weekly struggle">Weekly Struggle
                        </option>
                    </Select>
                </div>

                <div className="flex gap-4 items-center justify-between border-4 border-teal-700 border-dotted p-3">
                    <FileInput id="file" accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button gradientDuoTone="greenToBlue" type="button" size='sm'
                        onClick={handleUploadImage}>
                        {
                            imageUploadProgress ? (
                                <div className='w-16 h-16'>
                                    <CircularProgressbar
                                        value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}
                                    />
                                </div>
                            ) : (
                                'Upload Image'
                            )}
                    </Button>
                </div>
                {
                    imageUploadError &&
                    <Alert color='failure'>{imageUploadError}
                    </Alert>
                }

                {
                    formData.image && (
                        <img
                            src={formData.image}
                            alt='upload'
                            className='w-full h-72 object-cover'
                        />
                    )
                }
                <ReactQuill theme="snow" placeholder="Write something..." className="font-display h-72 mb-12 " required />
                <Button type="submit" gradientDuoTone="greenToBlue">Publish</Button>
            </form>
        </div>
    )
}
