import Component from '../../Component/index';
import Pages from '../index';
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";

function AdminDashboard() {
  return (
    <>
    <Router>
    <Component.AdminTopbar />
    <div className='container'>
      <Component.AdminSidebar />
      
      <div className='others'>
      {/* <Routes>      
        <Route path="/admindashboard" element={<Pages.Home />} />         
      </Routes>
      <Routes>      
        <Route path="/leaves" element={<Pages.Leaves />} />         
      </Routes>

      <Routes>      
        <Route path="/myleaves" element={<Pages.MyLeaves />} />        
      </Routes>

      <Routes>      
        <Route path="/applyleaves" element={<Pages.ApplyLeaves />} />        
      </Routes>

      <Routes>      
        <Route path="/users/:userId" element={<Pages.EditUser />} />        
      </Routes> */}
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
