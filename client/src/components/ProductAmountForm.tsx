import { Form } from "react-bootstrap";

const ProductAmountForm = ({ value, handleChange, length }: { value: number; handleChange: any; length: number }) => {
  const dynamicOptions = Array.from({ length }, (_, i) => 1 + i).map((ticketsAmount) => (
    <option key={"select" + ticketsAmount} value={ticketsAmount}>
      {ticketsAmount}
    </option>
  ));

  return (
    <Form.Control as="select" value={value} onChange={handleChange}>
      {dynamicOptions}
    </Form.Control>
  );
};

export default ProductAmountForm;
