import { useState, useRef, useEffect } from "react";

export function OptionList({optionList}) {
    const [showList, setShowList] = useState(false);
    const optionListContainerRef = useRef(null);

    // add listener to document when the component mounts
    useEffect(() => {
        function handleClickOutside(event) {
            if (optionListContainerRef.current &&
                !optionListContainerRef.current.contains(event.target)
            ) {
                setShowList(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return <div id="option-list-container" ref={optionListContainerRef}>
        {showList 
            ? <div id="option-item-container">
                {optionList.map((item, index) => {
                    return <div className="option-item-cell" onClick={item.onClick} key={index}><h3>{item.name}</h3></div>;
                })}
                </div>
            : null}
        <div id="dot-container" 
        onClick={
            () => {
                setShowList(true);
            }
        }>
            <div className="grey-dot"></div>
            <div className="grey-dot"></div>
            <div className="grey-dot"></div>
        </div>
    </div>;
}