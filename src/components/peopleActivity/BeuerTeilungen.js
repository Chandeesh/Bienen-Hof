import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Button, Modal, Dropdown } from "react-bootstrap";
import { getPeopleData, postPeopleData, deletePeopleData } from "../../actions/peopleData";
import { useLocation } from "react-router-dom";
import { setMessage } from "../../actions/message";
import { TrashFill } from "react-bootstrap-icons";

const BeuerTeilungen = () => {
    // const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const search = useLocation().search;
    const peopleId = new URLSearchParams(search).get('id');
    const beurteilungen = ["Volkstärke", "Raumreserve", "Weiselrichtigkeit", "Sanftmut", "Schwarmstimmung", "Futterversorgung", "Gesundheit", "VarroaBeurteilung"];
    const [showBeurteilungen, setShowBeurteilungen] = useState(false);
    const [showKönigin, setShowKönigin] = useState(true);
    const [showMaßnahmen, setShowMaßnahmen] = useState(false);
    const [showNotizen, setShowNotizen] = useState(false);
    const [showEditBeurteilungen, setShowEditBeurteilungen] = useState(false);
    const [peopleData, setPeopleData] = useState({});
    var beurteilungenTemp = {};
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDeleteOn = () => {setShowDelete(true);}
    const handleShowDeleteOff = () => setShowDelete(false);
    const [deleteBeuerTeilungenId, setDeleteBeuerId] = useState("");

    const handleEditeBeurteilungenOn = () => {
        setShowEditBeurteilungen(true);
    }

    const handleEditeBeurteilungenOff = () => {
        setShowEditBeurteilungen(false);
        beurteilungenTemp = [];
    }

    const getPeopleDatas = () => {
        dispatch(getPeopleData(peopleId))
        .then((response) => {
            setPeopleData(response);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        // Update the document title using the browser API
      getPeopleDatas();
    }, []);

    const setVisibility = (tab) => {
        setAllFalse();
        switch (tab) {
            case "Königin":
                setShowKönigin(true);
                break;
            case "Beurteilungen":
                setShowBeurteilungen(true);
                break;
            case "Maßnahmen":
                setShowMaßnahmen(true);
                break;
            case "Notizen":
                setShowNotizen(true);
                break;
            default:
                setAllFalse();
        }
    }

    const setAllFalse = () => {
        setShowBeurteilungen(false);
        setShowKönigin(false);
        setShowMaßnahmen(false);
        setShowNotizen(false);
    }

    const getColor = (key) => {

    }

    const handleAddBeuerteilungen = (element, color) => {
        beurteilungenTemp[element] = color;
    }

    const handleAddBeuerteilungenSave = () => {
        console.log(beurteilungenTemp);
        dispatch(postPeopleData(peopleId, beurteilungenTemp))
            .then(() => {
                getPeopleDatas();
                setShowEditBeurteilungen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleTrashClick = (id) => {
        setShowDelete(true);
        setDeleteBeuerId(id);
    }

    const handleDeleteBeuer = () => {
        dispatch(deletePeopleData(deleteBeuerTeilungenId))
            .then(() => {
                getPeopleDatas();
                setShowDelete(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div class="container" style={{ paddingTop: "20px" }}>
            <div class="d-flex justify-content-center">
                <ListGroup horizontal>
                    <ListGroup.Item action onClick={() => { setVisibility("Königin") }}>Königin</ListGroup.Item>
                    <ListGroup.Item action onClick={() => { setVisibility("Beurteilungen") }}>Beurteilungen</ListGroup.Item>
                    <ListGroup.Item action onClick={() => { setVisibility("Maßnahmen") }}>Maßnahmen</ListGroup.Item>
                    <ListGroup.Item action onClick={() => { setVisibility("Notizen") }}>Notizen</ListGroup.Item>
                </ListGroup>
            </div>
            <div class="d-flex justify-content-center" style={{ paddingTop: "20px" }}>
                {
                    showBeurteilungen ? <div class="table-responsive-sm">
                        <table class="table table-hover">
                            <thead>
                                <td>
                                    <tr>
                                        <th>Activity</th>
                                    </tr>
                                </td>
                                {peopleData.map((element, index) =>
                                    <td style={{ paddingLeft: '15px' }}>
                                        <tr>
                                            <th>{peopleData[index].date.replaceAll('-', '.').substr(5, 5)}</th>
                                        </tr>
                                    </td>
                                )}
                            </thead>
                            <tbody>
                                <td>
                                    {beurteilungen.map((element, index) => (
                                        <tr style={{ height: '34px', verticalAlign: 'middle' }} key={index}>{element}</tr>
                                    ))}
                                </td>
                                {
                                    peopleData.map((element, index) => (
                                        <td style={{ paddingLeft: '15px' }}>
                                            {beurteilungen.map((ele, inde) => (

                                                <tr key={inde} style={{ height: '34px', verticalAlign: 'middle' }}>
                                                    <button type="button" class="btn btn-circle" style={{ backgroundColor: peopleData[index].values[ele], borderColor: 'white' }}></button>
                                                </tr>
                                            ))}
                                            <TrashFill size={30} style={{ cursor: 'pointer' }} onClick={() => handleTrashClick(element._id)}>
                                            </TrashFill>
                                        </td>

                                    ))
                                }
                            </tbody>
                        </table>
                        <Button variant="warning" onClick={() => handleEditeBeurteilungenOn()}>Add Data</Button>{'   '}

                    </div> : <></>
                }
            </div>
            <Modal show={showEditBeurteilungen} onHide={handleEditeBeurteilungenOff}>
                <Modal.Header closeButton>
                    <Modal.Title>Please Edit Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="d-flex justify-content-center" style={{ paddingTop: "20px" }}>

                        <div class="table-responsive-sm">
                            <table class="table table-hover">

                                <tbody>
                                    <td>
                                        {beurteilungen.map((element, index) => (
                                            <tr key={index} style={{ height: '44px', verticalAlign: 'middle' }}>
                                                {element}</tr>
                                        ))}
                                    </td>
                                    <td style={{ paddingLeft: '10px' }}>
                                        {beurteilungen.map((element, index) => (
                                            <tr key={index} style={{ height: '44px', verticalAlign: 'middle' }}>
                                                <div>

                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                                            Select Status
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>
                                                                <button type="button" onClick={() => handleAddBeuerteilungen(element, 'green')} class="btn btn-circle" style={{ backgroundColor: 'green', borderColor: 'white' }}></button>
                                                                <button type="button" onClick={() => handleAddBeuerteilungen(element, 'yellow')} class="btn btn-circle" style={{ backgroundColor: 'yellow', borderColor: 'white' }}></button>
                                                                <button type="button" onClick={() => handleAddBeuerteilungen(element, 'red')} class="btn btn-circle" style={{ backgroundColor: 'red', borderColor: 'white' }}></button>
                                                                <button type="button" onClick={() => handleAddBeuerteilungen(element, 'lightgreen')} class="btn btn-circle" style={{ backgroundColor: 'lightgreen', borderColor: 'white' }}></button>
                                                                <button type="button" onClick={() => handleAddBeuerteilungen(element, 'lightgrey')} class="btn btn-circle" style={{ backgroundColor: 'lightgrey', borderColor: 'white' }}></button>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown></div></tr>
                                        ))}
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleEditeBeurteilungenOff}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleAddBeuerteilungenSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleShowDeleteOff}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete this item?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleShowDeleteOff}>
                        Close
                    </Button>
                    <Button variant="warning" onClick = {handleDeleteBeuer}>
                        Delete
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
};
export default BeuerTeilungen;