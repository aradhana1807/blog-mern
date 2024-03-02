import { Button, FileInput, Select, TextInput } from "flowbite-react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function CreatePost() {
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
                    <FileInput id="file" accept="image/*" />
                    <Button gradientDuoTone="greenToBlue" type="button" size='sm'>Upload Image</Button>
                </div>
                <ReactQuill theme="snow" placeholder="Write something..." className="font-display h-72 mb-12 " required />
                <Button type="submit" gradientDuoTone="greenToBlue">Publish</Button>
            </form>
        </div>
    )
}
