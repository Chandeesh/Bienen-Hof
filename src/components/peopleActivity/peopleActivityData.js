import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Button, Modal, Dropdown } from "react-bootstrap";
import { getPeopleData, postPeopleData, deletePeopleData } from "../../actions/peopleData";
import { useLocation } from "react-router-dom";
import { setMessage } from "../../actions/message";
import { TrashFill } from "react-bootstrap-icons";
import BeuerTeilungen  from "./BeuerTeilungen";

const PeopleActivityData = () => {
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
                    showBeurteilungen ? <BeuerTeilungen></BeuerTeilungen> : <></>
                }
            </div>
        </div>
    )
};
export default PeopleActivityData;