import React, { useContext, useState, useEffect } from "react"
import styles from "./FloatingMenu.module.css"
import MenuTitle from "./MenuTitle"
import { SceneContext } from "../context/SceneContext";
import Slider from "./Slider";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function SpriteCreation({selectedTrait, selectedVRM}){
    const { manifest, spriteAtlasGenerator, sceneElements } = React.useContext(SceneContext)

    const [ options, setOptions ] = useState([]) 
    const [ description, setDescription ] = useState("");
    const [ manifestLocation, setManifestLocation ] = useState("");

    const onSelect = (sel) =>{
        if (manifest?.sprites != null){
            setDescription(manifest.sprites[sel.value].description)
            setManifestLocation(manifest.sprites[sel.value].manifest);

            console.log(manifest.sprites[sel.value].manifest)
        }
    }

    const createSpritesData = async() =>{
        const parentScene = sceneElements.parent;
        parentScene.remove(sceneElements);
        await spriteAtlasGenerator.createSpriteAtlas(manifestLocation);
        parentScene.add(sceneElements);
      }


    useEffect(() => {
    if (manifest?.sprites != null){
        const manifestOptions = manifest.sprites.map((c,i) => {
            return {
                value:i, 
                label:c.name, 
                description: c.description,
                manifest: c.manifest,
            }
          })
          setOptions(manifestOptions);
    }
    }, [manifest])
    return (
        
        <div>
            <div className={styles["InformationContainerPos"]}>
                <MenuTitle title="Lora Creation" width={180} right={20}/>
                <div className={styles["scrollContainer"]}>
                    <div className={styles["traitInfoTitle"]}>
                        Sprite Manifests
                    </div>
                    <Dropdown options={options} onChange={onSelect} placeholder="Select an option" />;
                
                    <div className={styles["traitInfoText"]}>
                        {description || ""}
                    </div>
                    {
                        manifestLocation != "" && 
                        <div 
                            className={styles["actionButton"]}
                            onClick={createSpritesData}>
                            <div>  Create Sprite Data </div>
                        </div>
                    }
                </div>
            </div>
        </div>
      )
}