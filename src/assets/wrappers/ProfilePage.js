import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justifycontent: center;
  .img {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    margin: 2px auto;
  }
  .user-info {
    display: grid;
    justifycontent: center;
    place-items: center;
    grid-template-columns: 1fr 1fr;
  }
  .user-info h3 {
    overflow: hidden;
    width: 300px;
    text-align: center;
    margin: 10px;
    background-color: #486581;
    border-radius: 6px;
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem;
  }
  .btn-block {
    padding: 0 2rem;
  }
  .btn {
    cursor: pointer;
    color: var(--white);
    background: var(--primary-500);
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    padding: 0.375rem 0.75rem;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    text-transform: capitalize;
    font-size: 1.2rem;
    margin: 10px;
    display: inline-block;
  }
  .btn:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
  }
  .posts {
    display: flex;
    margin-top: 2rem;
    width: 100%;
    flex-direction: row-reverse;
    padding: 0 8rem;
  }
`;
export default Wrapper;
