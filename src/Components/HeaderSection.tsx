import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { Root } from "../types"
import { changeSelectFilter } from "../Redux/Slices/selectFilterSlice"
import { CustomInput } from "./CustomInput"


const Container = styled.div`
  width: 100%;
  background-color: #b8b8cb;
  padding: 10px;
  box-sizing: border-box;
`
const NameAndSelectContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 15px;
    padding: 10px 0;
`

const Name = styled.div`
    margin-left: 10%;
`

const Select = styled.select`
    min-width: 150px;
    padding: 7px 10px;
    border-radius: 5px;

    &:focus {
        outline: none;
    }

     option {
    }
`



export const HeaderSection = () => {
    const selectVal = useSelector((state: Root) => state.selectFilter)
    const dispatch = useDispatch()


    return (
        <Container>
            <NameAndSelectContainer>
                <Name>Todo-List</Name>
                <Select value={selectVal} onChange={(e) => dispatch(changeSelectFilter(e.target.value))}>
                    <option value={'all'}>Все</option>
                    <option value={'done'}>Выполненые</option>
                    <option value={'not-done'}>В процессе</option>
                </Select>
            </NameAndSelectContainer>
            <CustomInput />
        </Container>
    )
}