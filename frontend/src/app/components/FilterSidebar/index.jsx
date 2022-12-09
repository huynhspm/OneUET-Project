import {
    List,
    ListItem,
    Divider,
    FormGroup,
    FormControlLabel,
    Typography,
    Checkbox
} from "@mui/material";
import { FilterBox, CategoryBox } from "../../utils/styles";

const FilterSidebar = (props) => {
    return (
        <>
            <Divider />
            <List>
                <ListItem>
                    <FilterBox> Filter </FilterBox>
                </ListItem>
            </List>
            <Divider />
            {Object.keys(props.filterData).map((data) => (
                <div>
                    <List>
                        <ListItem disablePadding>
                            <CategoryBox>
                                {data}
                            </CategoryBox>
                        </ListItem>
                    </List>
                    <FormGroup sx={{ ml: 2 }}>
                        {props.filterData[data].map((text) => (
                            <FormControlLabel
                                label={<Typography sx={{ fontSize: 14 }}>{text}</Typography>}
                                control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />}
                                sx={{ pl: 1 }} />
                        ))}
                    </FormGroup>
                </div>
            ))}
        </>
    );
};

export default FilterSidebar;