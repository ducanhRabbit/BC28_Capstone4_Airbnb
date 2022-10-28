import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import PopperWrapper from "../Popper/Popper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getLocationAPI, LocationState } from "../../redux/reducers/locationReducer";
import { NavLink } from "react-router-dom";
type Props = {};

export default function SearchHeader({}: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [showResult,setShowResult] = useState(true)

  const {arrLocation} = useSelector<RootState,LocationState>((state) => state.locationReducer)
  const dispatch:AppDispatch = useDispatch()
  const inputRef = React.useRef<HTMLInputElement>(null);


  const handleHideResult = ()=>{
    setShowResult(false)
  }

  useEffect(()=>{
    let actionthunk = getLocationAPI()
    dispatch(actionthunk)
  },[])
  
  return (
    <Tippy
      visible={showResult && !!arrLocation}
      interactive={true}
      onClickOutside = {handleHideResult}
      render={(attrs) => (
        <div className="search-popper" tabIndex={-1} {...attrs}>
          <PopperWrapper>
            <div className="search-content">
              {arrLocation?.filter((item,index) => item.tenViTri.toLowerCase().includes(searchValue.toLowerCase())).map((item,index)=>{
                return <NavLink to={'/login'} className="search-item d-flex align-items-center justify-content-between" key={item.id} >
                <span className="location-icon d-flex align-items-center justify-content-center">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <span className="location-result">{`${item.tenViTri}, ${item.tinhThanh} - ${item.quocGia}`}</span>
              </NavLink>
              })}
            </div>
          </PopperWrapper>
        </div>
      )}
    >
      <div className="search-bar">
        <input
        placeholder="Địa điểm cần tìm?"
          autoFocus
          type="text"
          className="search-input"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onFocus={()=>{
            setShowResult(true)
          }}
          value={searchValue}
          ref={inputRef}
        />
        {!!searchValue && (
          <button className="close-btn" onClick={() => {
            setSearchValue('');
            if (inputRef.current !== null) {
              inputRef.current.focus();
            }
          }}>
            <i className="fas fa-times-circle "></i>
          </button>
        )}
      </div>
    </Tippy>
  );
}
