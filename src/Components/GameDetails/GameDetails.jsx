
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingSecreen from '../LoadingSecreen/LoadingSecreen'
export default function GameDetails() {

    let [AllDetails, SetAllDetails] = useState([])
    const [loading, setLoading] = useState(true);

    let { id } = useParams();
    useEffect(() => {
        DbData();
    }, [])
    async function DbData() {
        setLoading(true)
        let { data } = await axios.get(
            'https://free-to-play-games-database.p.rapidapi.com/api/game',
            {
                headers: {
                    'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                },
                params: {
                    id
                }
            }
        )
        SetAllDetails(data)
        setLoading(false)
    }
    return (
        <>
            {
                loading == true ? <LoadingSecreen />
                :
                    AllDetails != null ? <div className='row mb-5'>
                        <div className='col-md-4 p-3'>
                            <div className='mov'>
                                <img src={AllDetails.thumbnail} alt="" className='w-100 rounded-3 mb-1' />
                                <button className='Button-Free'>{AllDetails.status}</button>
                                <a href={AllDetails.freetogame_profile_url} target="_blank">
                                    <button className='Button-Download'>PLAY NOW <i className="fas fa-sign-out-alt"></i></button>
                                </a>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <h1>{AllDetails.title}</h1>
                            <h5 className="mt-3">{AllDetails.short_description}</h5>
                            <p>{AllDetails.description}</p>
                            <h5 className="mt-3">Minimum System Requirements</h5>
                            <ul className="list-unstyled ms-2">
                                {
                                    AllDetails.minimum_system_requirements !== undefined ?
                                        <>
                                            <li><strong>graphics : </strong>{AllDetails.minimum_system_requirements.graphics}</li>
                                            <li><strong>memory : </strong>{AllDetails.minimum_system_requirements.memory}</li>
                                            <li><strong>os : </strong>{AllDetails.minimum_system_requirements.os}</li>
                                            <li><strong>processor : </strong>{AllDetails.minimum_system_requirements.processor}</li>
                                            <li><strong>storage : </strong>{AllDetails.minimum_system_requirements.storage}</li>
                                        </>
                                        : ""
                                }

                            </ul>
                            <h4>5Street Screenshots</h4>
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    {
                                        AllDetails.screenshots !== undefined ?
                                            AllDetails.screenshots.map((get) =>
                                                <div className="carousel-item active">
                                                    <img src={get.image} className="d-block w-100" />
                                                </div>
                                            )
                                            : ""
                                    }
                                </div>
                            </div>

                            <h2 className='mt-3'>Additional Information</h2>
                            <div className="row mb-3">
                                <div className="col-6 col-md-4">
                                    <span className="text-muted">Title<br /></span>
                                    <p>{AllDetails.title}</p>
                                </div>
                                <div className="col-6 col-md-4">
                                    <span className="text-muted">Developer<br /></span> {AllDetails.developer}
                                </div>
                                <div className="col-6 col-md-4">
                                    <span className="text-muted">Publisher<br /></span> {AllDetails.publisher} </div>
                                <div className="col-6 col-md-4">
                                    <span className="text-muted">Release Date<br /></span>{AllDetails.release_date}</div>
                                <div className="col-6 col-md-4">
                                    <span className="text-muted">Genre<br /></span> {AllDetails.genre} </div>
                                <div className="col-6 col-md-4">
                                    <span className="text-muted">Platform<br /></span><i className="fab fa-windows me-1"></i> {AllDetails.platform} </div>
                            </div>
                        </div>
                    </div> : ''

            }

        </>
    )
}
