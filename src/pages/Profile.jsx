import React, { useState } from 'react';

function Profile(props) {

    const [imgString, setImgString] = useState();

        const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };


      const handleFile = async(e)=>{
        const files = e.target.files[0];
        console.log(files);
        const baseString = await convertBase64(files);
        setImgString(baseString);
      }

    return (
        <div className='pt-5 mt-5 text-center'>
            <input type="file" onChange={handleFile} multiple="multiple"/>

            <div className='img-fluid p-3'>
                <img src={imgString} alt="landscape" />
            </div>
        </div>
    );
}

export default Profile;