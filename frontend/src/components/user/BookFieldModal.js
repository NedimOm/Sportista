import React, { useState } from "react";

import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import {SERVER_URL} from "../../auth/Consts";
import axios from "axios";


const BookFieldModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTimeFrom, setSelectedTimeFrom] = useState('NONE'); // Selected time slot
    const [selectedTimeTo, setSelectedTimeTo] = useState('NONE'); // Selected time slot
    const [numSlots, setNumSlots] = useState(0); // Number of slots
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [bookedDates, setBookedDates] = useState([])

    const resetModal = () => {
        setSelectedTimeFrom("NONE")
        setSelectedTimeTo("NONE")
        setSelectedDate(new Date())

    }

    const handleTimeChangeFrom = (event) => {
        const newTimeFrom = event.target.value;
        setSelectedTimeFrom(newTimeFrom);
        calculateNumSlots(newTimeFrom, selectedTimeTo);
    };

    const handleTimeChangeTo = (event) => {
        const newTimeTo = event.target.value;
        setSelectedTimeTo(newTimeTo);
        calculateNumSlots(selectedTimeFrom, newTimeTo);
    };

    const calculateNumSlots = (timeFrom, timeTo) => {
        const from = new Date(`2000/01/01 ${timeFrom}`);
        const to = new Date(`2000/01/01 ${timeTo}`);
        const diffInMillis = Math.abs(to - from);
        const numSlots = Math.ceil(diffInMillis / (30 * 60 * 1000));
        setNumSlots(numSlots);
        if(numSlots)
            document.getElementById('price').value=(numSlots * props.field.fields.price).toString() + "$";
        else
            document.getElementById('price').value="";
    };

    const handleBooking = () => {
        if(selectedTimeFrom === 'NONE' || selectedTimeTo === 'NONE'){
            alert("UNESI DATUME")
            return
        }
        if(selectedTimeFrom && selectedTimeTo){
            let validan = true
            let start = new Date(selectedDate)
            let end = new Date(selectedDate)
            start.setHours(selectedTimeFrom.split(':')[0])
            start.setMinutes(selectedTimeFrom.split(':')[1])
            end.setHours(selectedTimeTo.split(':')[0])
            end.setMinutes(selectedTimeTo.split(':')[1])
            bookedDates.forEach((date) => {
                if(date.start.getDate() === selectedDate.getDate()){
                    const time_appointed_start = 60 * start.getHours() + start.getMinutes()
                    const time_appointed_end = 60 * end.getHours() + end.getMinutes()
                    const time_start = 60 * date.start.getHours() + date.start.getMinutes()
                    const time_end = 60 * date.end.getHours() + date.end.getMinutes()
                    validan = !((time_start > time_appointed_start && time_end <= time_appointed_end) || (time_start >= time_appointed_start && time_end < time_appointed_end))
                }
            })

            if(!validan){
                alert("POSTOJI TERMIN IZMEDJU IZABRANIH DATUMA")
                return
            }
            if(start >= end){
                alert("POGRESNO IZABRANI DATUMI")
                return
            }

            axios.post(`${SERVER_URL}/user/solo_book_field/`, {
                id_usera: props.user.id,
                id_sporta: props.field.fields.is_sport,
                id_fielda: props.field.pk,
                price: props.field.fields.price,
                start: start,
                ends:  end
            })
        }
        closeModal()

    };

    // Generate time options from 8 AM to 12 PM
    const generateTimeOptions = (start, end, id) => {
        const options = [];
        //TO DO - provjeri da li odgovara sa terminima u bazi
        if(start !== undefined && end !== undefined){
            let start_date = new Date(selectedDate)
            let end_date = new Date(selectedDate)
            start_date.setHours(start.split(":")[0])
            end_date.setHours(end.split(":")[0])
            options.push(<option>NONE</option>)
            if(new Date().getDate() === start_date.getDate()){
                start_date.setHours(Math.max(parseInt(start.split(":")[0]), new Date().getHours()))
            }
            if(new Date().getDate() > start_date.getDate()){
                start_date.setHours(24)
            }
            for (let i = start_date.getHours(); i <= end_date.getHours(); i++) {
                let validHour = true
                let validHalfHour = true
                bookedDates.forEach((date) => {
                    date.start = new Date(date.start)
                    date.end = new Date(date.end)
                    if(date.start.getDate() === selectedDate.getDate() && date.start.getHours() <= i && i <= date.end.getHours() && date.id_field !== id && !(date.end.getMinutes() === 0 && i === date.end.getHours())){
                        validHour = false
                    }
                    if(date.start.getDate() === selectedDate.getDate() && date.start.getHours() <= i && i <= date.end.getHours() && date.id_field !== id && !(date.end.getMinutes() === 30 && i === date.end.getHours())){
                        if(!(validHour === true && i === date.end.getHours()))
                            validHalfHour = false
                    }
                    if(i === end_date.getHours())
                        validHalfHour = false

                })
                if(validHour)
                    options.push(
                        <option key={`${i}:00`} value={`${i}:00`}>{`${i}:00`}</option>,
                    );
                if(validHalfHour)
                    options.push(
                        <option key={`${i}:30`} value={`${i}:30`}>{`${i}:30`}</option>,
                    );
            }

        }
        if(options.length === 2)
            return [ <option>NONE</option> ]
        return options;
    };

    const openModal = () => {
        axios.get(`${SERVER_URL}/user/get_dates/${props.field.pk}/`).then((result)=>{
            setBookedDates(result.data)
        })
        setIsOpen(true)};
    const closeModal = () => {resetModal(); setIsOpen(false)};

    return (
        <>
            <Button variant="outlined" onClick={openModal}>BOOK</Button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>BOOK THIS FIELD</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <input className="custom-input" type="date" value={selectedDate.toISOString().split('T')[0]} onChange={(event) => {setSelectedDate(new Date(event.target.value))}}/>
                        <select className="custom-input" value={selectedTimeFrom} onChange={handleTimeChangeFrom}>
                            {generateTimeOptions(props.field.fields.starts, props.field.fields.ends, props.field.pk)}
                        </select>
                        <select className="custom-input" value={selectedTimeTo} onChange={handleTimeChangeTo}>
                            {generateTimeOptions(props.field.fields.starts, props.field.fields.ends, props.field.pk)}
                        </select>

                    {/* cijena bi trebalo da se izračuna po slotu, a cijena slota se pravi kada se pravi teren, slot je pola sata */}
                    <input className="custom-input" id="price" name="price" type="text" disabled={true}/>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckReverse" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckReverse">Book weekly!</label> </div>
                    <Button variant="outlined" className="mt-3" onClick={handleBooking}>
                        BOOK
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default BookFieldModal;
