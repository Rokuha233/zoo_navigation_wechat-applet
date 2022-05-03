import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;



public class deal extends HttpServlet {
    String in=null;
    //退票
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("conntent success by deal");
        //接收
        Map map = req.getParameterMap();//map集合 存储前端数据
        Gson gson = new Gson();//工具类Gson@google 可以把map数组转换为字符串或json
        String mapJsonString = gson.toJson(map);//将数据转化为字符串
        System.out.println(mapJsonString);//输出转化后的字符串
        try {
            resp.getWriter().write(toSQL(in));//返回给前端 退票结果
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //向数据库注入
    //需要输入的数据：身份证号：in
    public String toSQL(String in) throws Exception {
        //注册驱动
        Class.forName("com.mysql.jdbc.Driver");
        //连接数据库
        String url = "jdbc:mysql://localhost:3306/wechat";
        Connection c = DriverManager.getConnection(url, "root", "123456");
        //检索buy表 查找该身份证的购买记录
        String sql1 = "select identification_number from buy where identification_number=" + in+";";
        PreparedStatement ps1 = c.prepareStatement(sql1);
        ResultSet rs = ps1.executeQuery();
        System.out.println("success-1!");
        ps1.close();
        //判断返回的身份证是否存在购买情况
        int k = 0;
        while (rs.next()) {
            k++;
        }
        if (k != 0) {
            //存在购买记录
            //检索bookzoo表 查找该身份证的预约记录
            String sql2 = "select identification_number from bookzoo where identification_number=" + in+";";
            PreparedStatement ps2 = c.prepareStatement(sql2);
            ResultSet rs2 = ps2.executeQuery();
            System.out.println("success-2!");
            ps2.close();
            //判断返回的身份证是否存在购买情况
            int i = 0;
            while (rs2.next()) {
                i++;
            }
            if (i != 0) {
                //存在预约情况 删除预约的条目
                String sql3 = "delete from bookzoo where identification_number="+in+";";
                PreparedStatement ps3 = c.prepareStatement(sql3);
                ps3.executeUpdate();
                System.out.println("success-3!");
                ps3.close();
            }
            rs2.close();
            //存在购买情况 删除购买的条目
            String sql4 = "delete from buy where identification_number="+in+";";
            PreparedStatement ps4 = c.prepareStatement(sql4);
            ps4.executeUpdate();
            System.out.println("success-4!");
            ps4.close();

        } else {
            return "done!";
        }
        c.close();
        return "success!";
    }
    public String delstr(String str) {
        //需要删除的字符串
        int st = 0;
        int len = str.length();
        char[] val = str.toCharArray();
        char[] c1 =new char[val.length-4];
        int k=0;
        for(int i=2;i<val.length-2;i++) {
            c1[k] = val[i];
            k++;
        }
        String over=String.valueOf(c1);
        System.out.println("new:"+over);
        return(over);
    }
}