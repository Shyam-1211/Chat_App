import React, { useContext, useEffect, useState } from 'react';
import './ProfileUpdate.css';
import assets from '../../assets/assets';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [uid, setUid] = useState('');
  const { setUserData } = useContext(AppContext);

  const update = async (event) => {
    event.preventDefault();
    try {
      const docRef = doc(db, 'users', uid);
      if (name) {
        await updateDoc(docRef, {
          name: name,
          bio: bio,
        });
      }
      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate('/chat');
    } catch (error) {
      toast.error('Error');
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }
        if (docSnap.data().bio) {
          setBio(docSnap.data().bio);
        } else {
          navigate('/');
        }
      }
    });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `url('/background.png')` }}>
        <div className=" bg-white flex flex-col sm:flex-row items-center justify-between sm:min-w-[700px] sm:rounded-lg w-full sm:w-auto p-4 sm:p-10">
          <form onSubmit={update} className="flex flex-col gap-5 w-full sm:w-[400px]">
            <h3 className="font-medium text-center sm:text-left">Profile Details</h3>
            <label htmlFor="avatar" className="flex items-center gap-2 text-gray-500 cursor-pointer">
              <input
                type="file"
                id="avatar"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
              <img
                src={image ? URL.createObjectURL(image) : assets.avatar_icon}
                alt=""
                className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full"
              />
              upload profile image
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Your Name"
              required
              className="p-2 min-w-[300px] border border-[#c9c9c9] focus:outline-[#077eff]"
            />
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              placeholder="Write Bio"
              required
              className="p-2 min-w-[300px] border border-[#c9c9c9] focus:outline-[#077eff]"
            ></textarea>
            <button
              type="submit"
              className="border-none text-white bg-[#077eff] p-2 text-lg cursor-pointer"
            >
              Save
            </button>
          </form>
          <img
            src={image ? URL.createObjectURL(image) : assets.logo_icon}
            className=" max-w-[160px] aspect-[1/1] mx-auto sm:ml-5 mt-5 sm:mt-0 sm:mr-5 rounded-full"
            alt="profile"
          />
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
