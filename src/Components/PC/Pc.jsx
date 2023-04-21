import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import $ from 'jquery'
import { useNavigate } from 'react-router-dom'
import LoadingSecreen from '../LoadingSecreen/LoadingSecreen'
export default function Pc() {

  let [AllList, SetAllList] = useState([])
  let [DataLength, SetDataLength] = useState(0)
  let [Count, SetCount] = useState(8)
  let [ButClos, SetButClos] = useState(false)
  const [loading, setLoading] = useState(true);
  let Navigate = useNavigate()

  useEffect(() => {
    DbData();
    if (ButClos == true) {
      $("#ButMore").hide(1000)
    }
  }, [Count, ButClos])
  async function DbData() {
    setLoading(false)
    let { data } = await axios.get(
      'https://free-to-play-games-database.p.rapidapi.com/api/games',
      {
        headers: {
          'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        },
        params: {
          'Platforms': 'Pc'
        }
      }
    )
    setLoading(false)
    SetAllList(data.slice(0, Count))
    SetDataLength(data.length)
  }
  function SeeMore() {
    if (Count < DataLength) {
      let newCount = Count + 8
      SetCount(newCount)
    }
    else {
      SetButClos(true)
    }
  }
  return (
    <>
      {loading == true ? <LoadingSecreen />
        :
        <>
          <div className='row'>
            {AllList.map((GetAll,) =>
              <div key={GetAll.id} className='col-md-3 mt-5 p-2'>
                <NavLink to={"/GameDetails/" + GetAll.id}>
                  <div className='back'>
                    <img src={GetAll.thumbnail} alt={GetAll.title} className='w-100' />
                    <div className='p-3 position-relative'>
                      <div className='Free-position'>Free</div>
                      <h2 className='text-muted fs-5 fw-bold'>{GetAll.title.slice(0, 13)}...</h2>
                      <p className='text-muted fs-6'>{GetAll.short_description.slice(0, 25)}...</p>
                      <div className="d-flex justify-content-between">
                        <i className="fas fa-plus-square"></i>
                        <div className="d-flex mb-n2 justify-content-between align-items-center">
                          <span className="Span-Cir me-2">{GetAll.genre}</span>
                          {GetAll.platform == "PC (Windows)" ?
                            <i title="Available on Windows" className="fab fa-windows text-muted"></i>
                            :
                            <i title="Available on Browser" className="fas fa-window-maximize text-muted 
                                        stretched-link"></i>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            )}
          </div>
          <div className='LeftNav'>
            <div className='RightCounter'>
              <h6>Total Games</h6>
              <p>{DataLength}</p>
            </div>
            <div className='RightCounter'>
              <h6>Total View</h6>
              <p>{Count}</p>
            </div>
            <button onClick={SeeMore} id="ButMore" type="Submit">View More</button>
          </div>
        </>
      }

    </>
  )
}
