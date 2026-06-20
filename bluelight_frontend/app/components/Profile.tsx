import { User as UserIcon, Mail, Trophy, Edit } from "lucide-react";
import Image from "next/image";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";

interface ProfileProps{
  user: User | null;
  setEditing: (editing: boolean) => void;
}

const Profile = ({ user, setEditing }: ProfileProps) => {
  
  return (
    <div className="space-y-3 w-full">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500 mb-6">
        <Image
          src={user?.profilePicUrl ?? "/images/default-user.png"}
          alt="Profile Picture"
          fill
          className="object-cover"
        />
      </div>
      
      <h2 className="text-3xl font-bold text-blue-300 flex items-center gap-2">
        <UserIcon className="w-6 h-6 text-blue-400" />
        {user?.username || "User not found"}
      </h2>
  
      <p className="flex items-center text-zinc-400 gap-2">
        <Mail className="w-4 h-4 text-zinc-500" /> {user?.email}
      </p>
  
      <p className="text-zinc-400 italic">{user?.bio || ""}</p>
  
      <div className="flex items-center gap-3 mt-2">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <span className="text-yellow-400 font-medium">
          {user?.points ?? 0} points
        </span>
      </div>
  
      <Button
        onClick={() => setEditing(true)}
        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 w-full md:w-auto hover: cursor-pointer"
      >
        <Edit className="w-4 h-4" /> Edit Profile
      </Button>
    </div>
  );
};

export default Profile;
