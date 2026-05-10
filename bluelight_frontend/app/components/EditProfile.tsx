
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import Image from "next/image";
import { updateProfile } from "@/services/user";
import { User, UpdateProfileRequest } from "@/types/user";
import { useAuth} from "@/context/AuthContext";

interface EditProfileProps{
  profilePicUrl: string;
  username: string;
  bio: string;
  setEditing: (editing: boolean) => void;
  user: User | null;
}

const EditProfile = ({
  profilePicUrl,
  username,
  bio,
  setEditing,
  user
}: EditProfileProps) => {
  const [profilePicUrlInput, setProfilePicUrlInput] = useState(profilePicUrl);
  const [usernameInput, setUsernameInput] = useState(username);
  const [bioInput, setBioInput] = useState(bio);
  const { setUser } = useAuth();
  const [usernameError, setUsernameError] = useState("");
  const [bioError, setBioError] = useState("");
  
  async function handleSave() {
    try {
      if (!user) return;

      if (usernameInput.length > 50) {
        setUsernameError("Username must be less than 50 characters");
        return;
      }

      setUsernameError("");

      if (bioInput.length > 200) {
        setBioError("Bio must be less than 200 characters");
        return;
      }

      setBioError("");
      
      const updateProfileRequest : UpdateProfileRequest = {
        username: usernameInput,
        bio: bioInput,
        profilePicUrl: profilePicUrlInput,
      };

      const updatedUser: User = await updateProfile(updateProfileRequest, user.token);
      updatedUser.token = user.token;

      setUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.log("Error saving profile: " + error);
    }
  }

  return (
    <div className="w-full max-wd-md">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500 mb-6">          
        <Image
          src={profilePicUrlInput}
          alt="Profile Picture"
          fill
          className="object-cover"
        />
      </div>
      
      <h2 className="text-white text-xs font-bold">Username</h2>
      <Input
        placeholder={usernameInput === "" ? "Add a username..." : ""}
        value={usernameInput ?? ""}
        onChange={(e) => setUsernameInput(e.target.value)}
        className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 mt-1 w-full max-wd-md"
      />
      <h2 className={usernameInput.length <= 50 ? 'text-white text-xs mt-1' : 'text-red-600 text-xs mt-1'}>
        {usernameInput.length}/50
      </h2>
      {usernameError && <p className="text-red-600 text-xs mt-1">{usernameError}</p>}
      

      <h2 className="text-white text-xs mt-5 font-bold">Bio</h2>
      <Textarea
        placeholder={bioInput === "" ? "Add a bio..." : ""}
        value={bioInput ?? ""}
        onChange={(e) => setBioInput(e.target.value)}
        className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 mt-1 resize-none"
      />
      <h2 className={bioInput.length <= 200 ? 'text-white text-xs mt-1' : 'text-red-600 text-xs mt-1'}>
        {bioInput.length}/200
      </h2>
      {bioError && <p className="text-red-600 text-xs mt-1">{bioError}</p>}
      

      <div className="flex-row flex gap-2">
        <Button
          onClick={handleSave}
          className="mt-4 bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 w-full md:w-auto hover: cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save
        </Button>

        <Button
          onClick={() => {
            setEditing(false)
            setUsernameInput(username)
            setBioInput(bio)
          }}
          className="mt-4 bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 w-full md:w-auto hover: cursor-pointer"
        >
          Cancel
        </Button>
      </div>
      
    </div>
  );
  
};

export default EditProfile;