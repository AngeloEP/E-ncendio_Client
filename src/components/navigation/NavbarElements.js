import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

 export const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((80vw - 1000px) / 2);
  z-index: 1;
`;

export const NavLinkLogo = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: #15cdfc;
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover{
    border-radius: 10px;
  }
  &.active {
    color: #15cdfc;
  }
  @media screen and (max-width: 875px) {
    width: 100%;
    justify-content: center;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 875px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const Times = styled(FaTimes)`
  display: none;
  color: #fff;
  @media screen and (max-width: 875px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 875px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 500px;
    position: absolute;
    top: 80px;
    left: -100%;
    opacity: 1;
    transition: all 0.5s ease;
    &.active{
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 0;
      transition: all .5s ease;
      width: 100%;
      height: 500px;
      top: 80px;
      background: #000;
      opacity: 1;
      z-index: 1;
    }
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 4px;
  @media screen and (max-width: 875px) {
    display: none;
  }
`;

export const ExitBtn = styled.button`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  &:hover{
    background: rgb(240, 235, 235);
    color: #256ce1;
    box-shadow: 20px 22px 20px 0 rgba(0,0,0,0.24),20px 17px 50px 0 rgba(0,0,0,0.19);
    transition: all 0.5s ease;
    transition: 600ms;
  }
  
  @media screen and (max-width: 875px) {
    display: none;
  }
`;

export const PNav = styled.p`
  color: #fff;
  font-size: 1.0rem;
  margin: 0;
  margin-top: 0.5rem;
  margin-left: 2rem;
  margin-right: .5rem;
`; 