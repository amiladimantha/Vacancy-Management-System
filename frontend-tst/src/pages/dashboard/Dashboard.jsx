import Component from '../../Component/index';
import Pages from '../index';
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";

function AdminDashboard() {
  return (
    <>
    <Router>
    <Component.Topbar />
    <div className='container'>
      <Component.Sidebar />
      
      <div className='others'>
      <Routes>      
        <Route path="/users/:userId" element={<Pages.Home />} />         
      </Routes>
      <Routes>      
        <Route path="/users/:userId/leaves" element={<Pages.Leaves />} />         
      </Routes>

      <Routes>      
        <Route path="/users/:userId/myleaves" element={<Pages.MyLeaves />} />        
      </Routes>

      <Routes>      
        <Route path="/users/:userId/applyleaves" element={<Pages.ApplyLeaves />} />        
      </Routes>

      <Routes>      
        <Route path="/users/:userId/edituser" element={<Pages.EditUser />} />        
      </Routes>
      </div>
    </div>
      {/* <Routes>
        <Route path='/' element={<Register />} />
      </Routes> */}
    </Router>
    </>
  );
}

export default AdminDashboard;
