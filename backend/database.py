from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ⚙️ Cấu hình kết nối PostgreSQL
# 🔑 Thay 'yourpassword' bằng mật khẩu thật của user 'postgres' trong pgAdmin
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:hieu11012004@localhost:5432/ngongu"

# 🔌 Kết nối tới database
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 🧩 Tạo session để thao tác với cơ sở dữ liệu
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 🏗️ Base class dùng để định nghĩa các model
Base = declarative_base()
