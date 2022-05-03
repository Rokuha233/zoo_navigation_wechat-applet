import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.LinkedList;
import java.util.Map;

public class buy extends HttpServlet {
    //购买门票
    public LinkedList buy=new LinkedList();
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf8");
        resp.setHeader("Access-Control-Allow-Origin","*");
        resp.setHeader("Access-Control-Allow-Methods","GET,POST");
        System.out.println("conntent success by buy");
        //身份证号：in 微信id：wechatid 预约时间：time
        String in="", wechatid="",time="";
        int number=0;
        //接收器
        Map map = req.getParameterMap();//map集合 存储前端数据
        Gson gson = new Gson();//工具类Gson@google 可以把map数组转换为字符串或json
        if(!map.isEmpty()){//判断传参非空
            map.forEach((key, value) -> {
                String mapJsonString = gson.toJson(value);//将数据转化为字符串
                buy.add(delstr(mapJsonString));//格式化参数 存储到buy链表
            });
            //为数据库所需数据传参
            for(int m=0;m<buy.size();m++){
                System.out.println("mes:"+buy.get(m));
                if(m==0){in+=buy.get(m);}//第一个值 身份证
                if(m==1){time+=buy.get(m);}//第二个值 时间
                if(m==2){wechatid+=buy.get(m);}//第三个值 微信id
            }
        }else{
            System.out.println("null!please restart!");
        }
        try {
            toSQL(in,"wechatid",time);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //向数据库注入
    //需要输入的数据：身份证号：in 微信id：wechatid 预约时间：time
    public String toSQL(String in, String wechatid, String time) throws Exception {
        //注册驱动
        Class.forName("com.mysql.jdbc.Driver");
        //连接数据库
        String url = "jdbc:mysql://localhost:3306/wechat";
        Connection c = DriverManager.getConnection(url, "root", "123456");
        //检索reserve表 查找用户是否已经使用该身份证购票
        String sql2 = "select identification_number from reserve where identification_number=" + in+";";
        PreparedStatement ps2 = c.prepareStatement(sql2);
        ResultSet rs = ps2.executeQuery();
        System.out.println("success-1!");
        int k = 0;
        while (rs.next()) {
            k++;
        }
        ps2.close();
        //判断返回的身份证是否已购票
        if (k == 0) {
            //未购票
            //向buy表内输入购票人的微信id和身份证号
            String sql1 = "insert into buy (wechatid,identification_number)"+" values ("+wechatid+","+in+")";
            PreparedStatement ps1 = c.prepareStatement(sql1);
            ps1.executeUpdate();
            System.out.println("success-2!");
            ps1.close();
            //将购票时间和身份证输入到reserve表
            String sql3 = "insert into reserve values (" + in + "," + time + ")"+";";
            PreparedStatement ps3 = c.prepareStatement(sql3);
            ps3.executeUpdate();
            System.out.println("success-3!");
            ps3.close();
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
        return(over);
    }
}