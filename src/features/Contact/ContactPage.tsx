import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configurationStore";
import { decrement, increment } from "./counterSlice";

function ContactPage() {
    const dispatch = useAppDispatch();

    const { data, title } = useAppSelector(state => state.counter);

    return (
        <>
            <Typography variant="h4">
                {title}
            </Typography>
            <Typography variant="h4">
                {data}
            </Typography>

            <ButtonGroup>
                <Button onClick = {() =>dispatch(decrement(1))} variant="contained" color='error'>Decrement</Button>
                <Button onClick = {() =>dispatch(increment(1))} variant="contained" color='primary'>Increment</Button>
                <Button onClick = {() =>dispatch(increment(5))} variant="contained" color='secondary'>Increment By 5</Button>
            </ButtonGroup>
        </>
    );
}

export default ContactPage;